import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTokens1665764129262 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS tokens(
                id INT KEY AUTO_INCREMENT,
                accessToken VARCHAR(250) UNIQUE NULL,
                refreshToken VARCHAR(250) UNIQUE NULL,
                actionToken VARCHAR(250) UNIQUE NULL,
                userId INT NOT NULL,
                role VARCHAR(250) NOT NULL,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS tokens');
    }
}
