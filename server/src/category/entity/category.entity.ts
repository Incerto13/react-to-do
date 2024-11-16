import { Task } from '../../task/entity/task.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from "@nestjs/swagger";


@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  @ApiProperty({ type: Number })
  id: number;

  @Column({ nullable: false, unique: true})
  @ApiProperty({ type: String })
  name: string;

  @OneToMany(() => Task, (task) => task.category)
  tasks?: Task[]
}