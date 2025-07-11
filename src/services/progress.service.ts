import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface ProgressState {
  percent: number;
  successCount: number;
  failedCount: number;
  total: number;
  status: 'idle' | 'loading' | 'completed' | 'error';
}

@Injectable({ providedIn: 'root' })
export class ProgressService {
  state = new BehaviorSubject<ProgressState>({
    percent: 0,
    successCount: 0,
    failedCount: 0,
    total: 0,
    status: 'idle'
  });

  public state$ = this.state.asObservable();

  updateProgress(newState: Partial<ProgressState>) {
    this.state.next({ ...this.state.value, ...newState });
  }

  resetProgress() {
    this.state.next({
      percent: 0,
      successCount: 0,
      failedCount: 0,
      total: 0,
      status: 'idle'
    });
  }
}
