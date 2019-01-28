# store the current path into a var
path=$(cd "$(dirname "$0")"; pwd)

# move the terminal to the current path
cd $path

yarn start