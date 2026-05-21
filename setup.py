import os
import sys

# Create directory structure
directories = [
    'src/app',
    'src/components',
    'public',
]

for directory in directories:
    full_path = os.path.join('.', directory)
    os.makedirs(full_path, exist_ok=True)
    print(f"Created {full_path}")

print("Setup complete!")
