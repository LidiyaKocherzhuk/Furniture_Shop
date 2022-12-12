import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableChat1661416036975 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS comment(
                id INT KEY AUTO_INCREMENT,
                userId INT NOT NULL,
                username VARCHAR(50) NOT NULL,
                surname VARCHAR(50) NULL,
                image VARCHAR(250) NULL,
                productId INT NOT NULL,
                product_model VARCHAR(50) NOT NULL,
                product_type VARCHAR(50) NOT NULL,
                product_image VARCHAR(250) NULL, 
                message VARCHAR(10000) NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS comment');
    }
}
