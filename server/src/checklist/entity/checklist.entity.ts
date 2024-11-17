import { Task } from '../../task/entity/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";


@Entity('checklists')
export class Checklist {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number })
  id: number;

  @Column({ nullable: false, unique: true})
  @ApiProperty({ type: String })
  title: string;

  @OneToMany(() => Task, task => task.checklist, { nullable: true, onDelete: 'CASCADE' })
  tasks: Task[];
}
