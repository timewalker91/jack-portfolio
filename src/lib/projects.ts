export type Project = {
  slug: string;
  title: string;
  context?: string;
  description: string;
  tech: string[];
};

export const projects: Project[] = [
  {
    slug: "aide-commerce",
    title: "Aide-commerce",
    context: "Built with a team of 4 at AWS x A10 Hack 2026",
    description:
      "Gives an AI shopping agent its own identity, checks every action it takes, and lets the user stop it mid-task; its next request is refused in about 0.7 seconds.",
    tech: ["Python", "React", "AWS (Cognito, KMS, DynamoDB, Bedrock)"],
  },
  {
    slug: "products-cli",
    title: "Product Inventory CLI",
    description:
      "A Python command-line tool (products.py) with add, list, get, update and delete commands, saving product records to a JSON file.",
    tech: ["Python"],
  },
];
