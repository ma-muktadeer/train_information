import { Injectable } from '@angular/core';
import { TrainResponse } from '../interfaces/train-details';
import { ApiService } from './api.service';
import { ProgressService } from './progress.service';
import { TrainScearchPayload } from '../interfaces/Station';

@Injectable({
  providedIn: 'root'
})
export class ParalalRequestService {
  private cache = new Map<string, Promise<TrainResponse>>();

  constructor(
    private apiService: ApiService,
    private progressService: ProgressService
  ) { }

  private getCacheKey(req: TrainScearchPayload): string {
    return `${req.from_city}-${req.to_city}-${req.date_of_journey}-${req.seat_class}`;
  }

  async searchSeatsWithLoadManagement(
    data: { key: string, requests: TrainScearchPayload[] },
    displayCallback: (data: TrainResponse[], key: string) => void,
    batchSize = 5,
    delayBetweenBatches = 300
  ){
    this.progressService.updateProgress({
      total: data.requests.length,
      status: 'loading'
    });

    const allResults: TrainResponse[] = [];
    const failedRequests: any[] = [];
    let processed = 0;

    for (let i = 0; i < data.requests.length; i += batchSize) {
      const batch = data.requests.slice(i, i + batchSize);

      const batchPromises = batch.map(req => {
        const cacheKey = this.getCacheKey(req);

        if (!this.cache.has(cacheKey)) {
          this.cache.set(
            cacheKey,
            this.apiService.searchSeat(req)
              .then(response => {
                displayCallback([response], data.key);
                return response;
              })
              .catch(error => {
              this.cache.delete(cacheKey);
              throw error;
            })
          );
        }

        return this.cache.get(cacheKey)!;
      });
      // debugger
      try {
        const batchResults = await Promise.allSettled(batchPromises);

        batchResults.forEach((result, index) => {
          if (result.status === 'fulfilled') {
            allResults.push(result.value);
            this.progressService.updateProgress({
              successCount: this.progressService.state.value.successCount + 1
            });
          } else {
            failedRequests.push({
              request: batch[index],
              error: result.reason
            });
            this.progressService.updateProgress({
              failedCount: this.progressService.state.value.failedCount + 1
            });
          }
        });

        processed += batch.length;
        const percent = (processed / data.requests.length) * 100;

        this.progressService.updateProgress({
          percent: parseFloat(percent.toFixed(1))
        });

        if (i + batchSize < data.requests.length && delayBetweenBatches > 0) {
          await new Promise(resolve => setTimeout(resolve, delayBetweenBatches));
        }
      } catch (error) {
        console.error('Batch processing error:', error);
      }
    }

    this.progressService.updateProgress({
      status: processed === data.requests.length ? 'completed' : 'error'
    });

    return { success: allResults, failed: failedRequests };
  }
}
