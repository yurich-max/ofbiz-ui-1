import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { TaskService } from './task-service';

@inject(Router, TaskService)
export class TaskList {
  datasource = {
    transport: {
      read: (options) => {
        this.taskService.getProjectTaskList({ projectId: this.projectId })
          .then(tasks => options.success(tasks));
      }
    },
    schema: {
      model: {
        fields: {
          workEffortId: { type: 'number' },
          workEffortName: { type: 'string' },
          phaseName: { type: 'string' },
          currentStatusId: { type: 'string' },
          priority: { type: 'number' },
          estimatedStartDate: { type: 'date' },
          startDate: { type: 'date' },
          estimatedCompletionDate: { type: 'date' },
          completionDate: { type: 'date' },
          plannedHours: { type: 'number' }
        }
      }
    }
  }

  constructor(router, taskService) {
    this.router = router;
    this.taskService = taskService;
  }

  activate(params) {
    this.projectId = params.id;
  }

  handleAddTask() {
    this.router.navigate('/new-task');
  }
}