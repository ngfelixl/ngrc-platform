import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Mapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('numeric')
  modelId: number;

  @Column('text')
  slots: string;
}
