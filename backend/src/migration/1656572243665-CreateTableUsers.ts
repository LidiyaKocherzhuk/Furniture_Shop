import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUsers1656572243665 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS users(
                id INT KEY AUTO_INCREMENT,
                username  VARCHAR(50) NOT NULL,
                surname VARCHAR(50) NULL,
                password VARCHAR(250) NOT NULL,
                email VARCHAR(250) UNIQUE NOT NULL,
                phone VARCHAR(255) UNIQUE NULL,
                age INT NULL,
                city VARCHAR(250) NULL,
                image VARCHAR(250) NULL,
                role VARCHAR(250) NOT NULL,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS users');
    }
}
