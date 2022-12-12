import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMadeOf1659600800751 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(` 
            CREATE TABLE IF NOT EXISTS made_of( 
                id INT KEY AUTO_INCREMENT,
                material VARCHAR(250) NOT NULL,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS made_of');
    }
}
