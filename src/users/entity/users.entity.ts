import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 40, name: 'firstname' })
  firstname: string;

  @Column({ type: 'varchar', length: 40, name: 'username' })
  username: string;

  @Column({ type: 'varchar', length: 40, name: 'email', unique: true })
  email: string;

  @Column({ type: 'varchar', length: 240, name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
