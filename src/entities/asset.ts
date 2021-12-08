import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'asset',
})
export class Asset {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: 'blob' })
  blob!: Buffer;
}
