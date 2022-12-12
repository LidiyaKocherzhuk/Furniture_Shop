import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableIsLike1660051575300 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS is_like(
            id INT KEY AUTO_INCREMENT,
            userId INT NOT NULL,
            productId INT NOT NULL,
            isLike BOOLEAN DEFAULT true,
            FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
            FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
            createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
            deletedAt TIMESTAMP
        )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS is_like');
    }
}
