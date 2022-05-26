import { MigrationInterface, QueryRunner } from 'typeorm';

export class Products1652573117936 implements MigrationInterface {
  async up(queryRunner: QueryRunner): Promise<void> {
    console.log(queryRunner);
    queryRunner.query(`INSERT INTO Product VALUES ('Debil', 200)`);
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    console.log('down');
  }
}
