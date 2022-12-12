import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableProductTextile1659521103226 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS product_textile(
                id INT PRIMARY KEY AUTO_INCREMENT,
                productId INT NOT NULL,
                textileId INT NOT NULL,
                FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
                FOREIGN KEY (textileId) REFERENCES textile(id) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS product_textile');
    }
}
