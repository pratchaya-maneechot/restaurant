async function main() {
  // const db = drizzle(DB_URL);
  // await reset(db, schema);
}
main()
  .then(() => {
    console.log('Reset db completed');
    process.exit(0);
  })
  .catch(console.error);
