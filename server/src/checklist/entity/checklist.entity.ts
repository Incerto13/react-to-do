import { Task } from '../../task/entity/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('checklists')
export class Checklist {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true})
  title: string;

  @OneToMany(() => Task, task => task.checklist, { nullable: true, onDelete: 'CASCADE' })
  tasks: Task[];
}
