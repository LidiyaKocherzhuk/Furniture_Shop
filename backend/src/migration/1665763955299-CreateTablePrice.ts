import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTablePrice1665763955299 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS price(
                id INT PRIMARY KEY AUTO_INCREMENT,
                size140_200 VARCHAR(250),
                size160_200 VARCHAR(250),
                size180_200 VARCHAR(250),
                size200_200  VARCHAR(250),
                bedId INT NOT NULL,
                FOREIGN KEY (bedId) REFERENCES products(id) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS price');
    }
}
