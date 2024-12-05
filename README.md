// Number of rows
const N = 5;

// Outer loop runs N times, once for each row
for (let i = 1; i <= N; i++) {
    // Inner loop prints 'N - i + 1' stars
    for (let j = 1; j <= N - i + 1; j++) {
        process.stdout.write("*");
    }
    // Move to the next line
    process.stdout.write("\n");
}
