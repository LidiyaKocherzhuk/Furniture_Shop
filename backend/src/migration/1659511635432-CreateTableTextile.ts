import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableTextile1659511635432 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE IF NOT EXISTS textile(
                id INT KEY AUTO_INCREMENT,
                productId INT,
                manufacturer VARCHAR(250) NOT NULL,
                textileName VARCHAR(250) NOT NULL,
                types VARCHAR(250) NOT NULL,
                numberOfShades VARCHAR(250),
                antiClaw VARCHAR(250) NULL,
                waterRepellent VARCHAR(250) NULL,
                easyToCare VARCHAR(250) NULL,
                durability VARCHAR(250),
                anotherDetails VARCHAR(250),
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS textile');
    }
}
