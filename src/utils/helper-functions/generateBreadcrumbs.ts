import { BreadcrumbLink, TreeNode } from 'types';

export function generateBreadcrumbs(
  node: TreeNode,
  breadcrumbs: BreadcrumbLink[] = []
): BreadcrumbLink[] {
  // Add current node to breadcrumbs list.
  breadcrumbs.push({ name: node.name, url: node.path });

  // If the node has a parent, recursively add its parent to the breadcrumbs list.
  if (node.parentPath) {
    const parentNode = findNodeByPath(node.parentPath, node);
    if (parentNode) {
      generateBreadcrumbs(parentNode, breadcrumbs);
    }
  }

  // Reverse the breadcrumbs list to display the links in correct order.
  breadcrumbs.reverse();

  return breadcrumbs;
}

export function findNodeByPath(path: string, rootNode: TreeNode): TreeNode | undefined {
  // Split the path into parts and iterate over them to find the node with the matching path.
  const parts = path.split('/').filter((part) => part !== '');
  let currentNode = rootNode;
  for (const part of parts) {
    // @ts-ignore
    currentNode = currentNode.children.find((child) => child.pathPart === part);
    if (!currentNode) {
      return undefined;
    }
  }
  return currentNode;
}
