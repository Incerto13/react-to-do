import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";
import { Category } from '../../category/entity/category.entity';
import { Checklist } from '../../checklist/entity/checklist.entity';


@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number })
  id: number;

  @Column({ nullable: false})
  @ApiProperty({ type: String })
  title: string;

  @Column({ type: 'text', nullable: true })
  @ApiProperty({ type: String })
  body: string;

  @ManyToOne(() => Category, category => category.tasks, { eager: true,  nullable: false })
  @JoinColumn({ name: 'categoryId' })
  category: Category

  @Column({ nullable: false })
  @ApiProperty({ type: Number })
  categoryId: number;

  @ManyToOne(() => Checklist, checklist => checklist.tasks, { eager: true, nullable: true })
  @JoinColumn({ name: 'checklistId' })
  checklist: Checklist

  @Column({ nullable: true })
  @ApiProperty({ type: Number })
  checklistId: number;

  @Column({ default: false })
  @ApiProperty({ type: Boolean })
  completed: boolean

  @Column({ nullable: true, name: 'timeOfCompletion'})
  @ApiProperty({ type: Date })
  timeOfCompletion?: Date
}