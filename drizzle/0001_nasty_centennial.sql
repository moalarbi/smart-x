CREATE TABLE `broadcastMessages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`title` varchar(255) NOT NULL,
	`content` text NOT NULL,
	`channel` enum('sms','whatsapp','email','all') NOT NULL,
	`recipientCount` int DEFAULT 0,
	`sentCount` int DEFAULT 0,
	`failedCount` int DEFAULT 0,
	`scheduledTime` timestamp,
	`sentTime` timestamp,
	`status` enum('draft','scheduled','sent','failed') DEFAULT 'draft',
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `broadcastMessages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `calls` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`callerId` varchar(64) NOT NULL,
	`callerName` text,
	`receiverId` varchar(64),
	`receiverName` text,
	`duration` int DEFAULT 0,
	`recordingUrl` text,
	`transcription` text,
	`status` enum('completed','missed','rejected','ongoing') DEFAULT 'completed',
	`direction` enum('inbound','outbound') NOT NULL,
	`number` varchar(20),
	`startTime` timestamp NOT NULL,
	`endTime` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `calls_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `companies` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`email` varchar(320) NOT NULL,
	`phone` varchar(20),
	`website` varchar(255),
	`industry` varchar(128),
	`country` varchar(2) DEFAULT 'SA',
	`status` enum('active','inactive','trial','suspended') DEFAULT 'trial',
	`ownerId` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `companies_id` PRIMARY KEY(`id`),
	CONSTRAINT `companies_email_unique` UNIQUE(`email`)
);
--> statement-breakpoint
CREATE TABLE `conversations` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`customerId` varchar(64) NOT NULL,
	`customerName` text,
	`customerPhone` varchar(20),
	`customerEmail` varchar(320),
	`assignedTo` int,
	`channels` varchar(255),
	`lastMessage` text,
	`lastMessageTime` timestamp,
	`status` enum('active','closed','pending','resolved') DEFAULT 'active',
	`priority` enum('low','medium','high','urgent') DEFAULT 'medium',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `conversations_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `messages` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`conversationId` int NOT NULL,
	`senderId` varchar(64) NOT NULL,
	`senderName` text,
	`content` text NOT NULL,
	`channel` enum('whatsapp','instagram','telegram','messenger','email','sms') NOT NULL,
	`messageType` enum('text','image','video','audio','file') DEFAULT 'text',
	`attachmentUrl` text,
	`status` enum('sent','delivered','read','failed') DEFAULT 'sent',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `messages_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `reports` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`reportType` enum('calls','messages','team_performance','customer_satisfaction','revenue') NOT NULL,
	`title` varchar(255) NOT NULL,
	`data` text,
	`period` enum('daily','weekly','monthly','yearly','custom') DEFAULT 'daily',
	`startDate` timestamp,
	`endDate` timestamp,
	`createdBy` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `reports_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriptions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`planName` varchar(64) NOT NULL,
	`planPrice` int NOT NULL,
	`billingCycle` enum('monthly','yearly') DEFAULT 'monthly',
	`status` enum('active','inactive','suspended','cancelled') DEFAULT 'active',
	`stripeCustomerId` varchar(255),
	`stripeSubscriptionId` varchar(255),
	`nextBillingDate` timestamp,
	`cancellationDate` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `subscriptions_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `unifiedNumbers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`companyId` int NOT NULL,
	`number` varchar(20) NOT NULL,
	`numberType` enum('unified_9200','toll_free_800','landline','mobile') NOT NULL,
	`country` varchar(2) DEFAULT 'SA',
	`status` enum('active','inactive','suspended') DEFAULT 'active',
	`assignedTo` int,
	`ivr` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `unifiedNumbers_id` PRIMARY KEY(`id`),
	CONSTRAINT `unifiedNumbers_number_unique` UNIQUE(`number`)
);
