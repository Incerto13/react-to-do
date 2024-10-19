import { Task } from '../../task/entity/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true})
  name: string;

  @OneToMany(() => Task, (task) => task.category)
  tasks?: Task[]
}