export type ProjectFeature = {
  title: string;
  detail: string;
};

export type Project = {
  slug: string;
  title: string;
  context?: string;
  summary: string;
  overview: string;
  features: ProjectFeature[];
  tech: string[];
};

export const projects: Project[] = [
  {
    slug: "aide-commerce",
    title: "Aide-commerce",
    context: "Built with a team of 4 at AWS x A10 Hack 2026",
    summary:
      "Gives an AI shopping agent its own identity, checks every action it takes, and lets the user stop it mid-task; its next request is refused in about 0.7 seconds.",
    overview:
      "Aide-commerce was built with a team of 4 at AWS x A10 Hack 2026. It is a safety layer for AI shopping agents: the agent gets its own identity, every action it takes is checked, and the user stays in control at all times — so shopping automation stays accountable instead of running unchecked.",
    features: [
      {
        title: "Agent identity",
        detail:
          "The AI shopping agent gets its own identity, so its actions can be attributed to it and managed separately from the user's.",
      },
      {
        title: "Every action checked",
        detail:
          "Each action the agent takes is checked before it goes through, keeping the agent's behavior under review.",
      },
      {
        title: "Stop mid-task",
        detail:
          "The user can stop the agent mid-task; its next request is refused in about 0.7 seconds.",
      },
    ],
    tech: ["Python", "React", "AWS (Cognito, KMS, DynamoDB, Bedrock)"],
  },
  {
    slug: "products-cli",
    title: "Product Inventory CLI",
    summary:
      "A Python command-line tool (products.py) with add, list, get, update and delete commands, saving product records to a JSON file.",
    overview:
      "Product Inventory CLI is a Python command-line tool (products.py) for managing product records from the terminal. It covers the full lifecycle of a record — add, list, get, update and delete — and saves everything to a JSON file, so data persists between runs without any database setup.",
    features: [
      {
        title: "add",
        detail: "Add a new product record to the inventory.",
      },
      {
        title: "list",
        detail: "List all product records currently saved.",
      },
      {
        title: "get",
        detail: "Look up a single product record.",
      },
      {
        title: "update",
        detail: "Update an existing product record.",
      },
      {
        title: "delete",
        detail: "Remove a product record from the inventory.",
      },
      {
        title: "JSON storage",
        detail:
          "Product records are saved to a JSON file, so data persists between runs with no database to set up.",
      },
    ],
    tech: ["Python"],
  },
];
