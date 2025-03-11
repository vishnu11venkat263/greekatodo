import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

@Entity('tasks')
export class TaskEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ type: 'date', nullable: false })
  dueDate: Date;

  @DeleteDateColumn({ type: 'date', nullable: true })
  deletedDate: Date;

  @Column({ type: 'varchar', nullable: true, default: 'Pending' })
  status: string;

  @Column({ type: 'varchar', nullable: true })
  priority: string;

  @CreateDateColumn({
    type: 'date',
    nullable: true,
  })
  createdAt: Date;

  @Column({ type: 'boolean', default: true, nullable: false })
  isActive: boolean;
}
