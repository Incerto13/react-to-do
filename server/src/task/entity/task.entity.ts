import { Category } from '../../category/entity/category.entity';
import { Checklist } from '../../checklist/entity/checklist.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false})
  title: string;

  @Column({ type: 'text', nullable: true })
  body: string;

  @ManyToOne(() => Category, category => category.tasks, { eager: true,  nullable: false })
  @JoinColumn({ name: 'categoryId' })
  category: Category

  @Column({ nullable: false })
  categoryId: number;

  @ManyToOne(() => Checklist, checklist => checklist.tasks, { eager: true, nullable: true })
  @JoinColumn({ name: 'checklistId' })
  checklist: Checklist

  @Column({ nullable: true })
  checklistId: number;

  @Column({ default: false })
  completed: boolean

  @Column({ nullable: true, name: 'timeOfCompletion'}) // snake_case
  timeOfCompletion?: Date
}