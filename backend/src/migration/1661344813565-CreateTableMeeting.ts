import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableMeeting1661344813565 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS meeting(
                id INT KEY AUTO_INCREMENT,
                userId INT NOT NULL,
                productId INT NOT NULL,
                isViewed BOOLEAN DEFAULT false NOT NULL,
                userPhone VARCHAR(250) NOT NULL,
                userEmail VARCHAR(250) NOT NULL,
                userName VARCHAR(250) NOT NULL,
                userSurname VARCHAR(250) NOT NULL,
                meetingMessage VARCHAR(250) NOT NULL,
                FOREIGN KEY (productId) REFERENCES products(id) ON DELETE CASCADE,
                FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE,
                createdAt TIMESTAMP DEFAULT(UTC_TIMESTAMP()) NOT NULL,
                deletedAt TIMESTAMP
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE IF EXISTS meeting');
    }
}
