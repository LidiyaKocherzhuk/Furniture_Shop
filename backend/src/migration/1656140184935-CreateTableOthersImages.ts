import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableOthersImages1656140184935 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS images_for_design(
                id INT KEY AUTO_INCREMENT,
                image VARCHAR(250) NOT NULL,
                location VARCHAR(250),
                description VARCHAR(2500),
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS images_for_design');
    }
}
