import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
// import { Slot } from '../../models';

@Entity()
export class Mapping {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  modelId: number;

  // @Column()
  // slots: Slot[];
}
