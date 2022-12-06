import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
  } from 'typeorm';
  import * as bcrypt from 'bcryptjs';
  
  @Entity()
  export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ unique: true })
    email: string;

    @Column()
    name: string;
  
    @Column({nullable: true})
    password: string;

    @Column('boolean', {default: false})
    is_facebook: boolean;

    @Column({nullable: true})
    fb_access_token: string;
  
    @Column()
    @CreateDateColumn()
    createdAt: Date;
  
    @Column()
    @UpdateDateColumn()
    updatedAt: Date;
  
    @BeforeInsert()
    async hashPassword() {
      if(!this.is_facebook){
        this.password = await bcrypt.hash(this.password, 8);
      }
    }
  
    async validatePassword(password: string): Promise<boolean> {
      return bcrypt.compare(password, this.password);
    }
  }