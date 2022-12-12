import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTextileImages1665045284413 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS textile_images(
            id INT PRIMARY KEY AUTO_INCREMENT,
            image VARCHAR(500) NOT NULL,
            textileId INT NOT NULL,
            FOREIGN KEY (textileId) REFERENCES textile(id) ON DELETE CASCADE,
            createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
            deletedAt TIMESTAMP  
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXSISTS textile_images');
    }
}
