export default function toValidPackageName(projectName) {
  return (
    projectName &&
    projectName
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/^[._]/, '')
      .replace(/[^a-z0-9-~]+/g, '-')
  );
}
