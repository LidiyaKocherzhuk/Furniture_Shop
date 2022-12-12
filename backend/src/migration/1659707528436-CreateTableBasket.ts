import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableBasket1659707528436 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS basket(
                id INT KEY AUTO_INCREMENT,
                userId INT NOT NULL,
                productId INT NOT NULL,
                productCount INT NOT NULL DEFAULT(0),
                productCountPrice INT NOT NULL,
                FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS basket');
    }
}
