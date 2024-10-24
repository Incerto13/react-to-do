-- -- Connect to the newly created database
\c "react-to-do";

-- -- Create the categories table with id and name columns
CREATE TABLE categories (
	id serial4 NOT NULL,
	"name" varchar NOT NULL,
	CONSTRAINT "PK_category_id" PRIMARY KEY (id),
	CONSTRAINT "K_category_name" UNIQUE (name)
);

-- -- Create the categories table with id and name columns
CREATE TABLE tasks (
	id serial4 NOT NULL,
	title varchar NOT NULL,
	body text NULL,
	completed bool DEFAULT false NOT NULL,
	"timeOfCompletion" timestamp NULL,
	"categoryId" int4 NOT NULL,
	CONSTRAINT "PK_task_id" PRIMARY KEY (id)
);
ALTER TABLE tasks ADD CONSTRAINT "FK_task_category_id" FOREIGN KEY ("categoryId") REFERENCES categories(id) ON DELETE CASCADE;

-- -- Cretae checklists table
CREATE TABLE checklists (
	id serial4 NOT NULL,
	title varchar NOT NULL,
	CONSTRAINT "PK_checklist_id" PRIMARY KEY (id),
	CONSTRAINT "K_checklist_title" UNIQUE (title)
);

-- add checklist foreign key to tasks
ALTER TABLE tasks ADD COLUMN "checklistId" int4 NULL;
ALTER TABLE tasks ADD CONSTRAINT "FK_task_checklist_id" FOREIGN KEY ("checklistId") REFERENCES checklists(id) ON DELETE CASCADE;


--- Seed initial data
INSERT INTO categories (name) VALUES
('Work'),
('Personal'),
('Fitness'),
('Household');

INSERT INTO tasks (title, body, "categoryId") VALUES
('Buy groceries', 'Need to buy milk and eggs', 4),
('Finish project', 'Complete the final project report', 1),
('Clean house', 'Vacuum and dust the living room', 4),
('Call plumber', 'Fix the kitchen sink leak', 4),
('Go for a run', 'Run 5 kilometers in the morning', 3);

INSERT INTO checklists (title) VALUES
('Grocery List');

INSERT INTO tasks (title, "categoryId", "checklistId") VALUES
('milk', 4, 1),
('paper towels', 4, 1),
('apples', 4, 1),
('onions', 4, 1),
('red pepers', 4, 1);

