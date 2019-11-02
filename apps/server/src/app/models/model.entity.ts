import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Model {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  title: string;

  @Column('text')
  slots: string;

  @Column('text')
  img: string;
}
