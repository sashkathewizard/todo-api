import { Status } from 'src/utils/enums/status.enum';

export class TaskEntity {
  title: string;
  description?: string;
  status?: Status;
}
