import path from "path";

const paths = {
    root: path.dirname(""),
    src: path.join(path.dirname(""), "src"),
    public: path.join(path.dirname(""), "src", "public"),
    views: path.join(path.dirname(""), "src", "views"),
    files: path.join(path.dirname(""), "src", "files"),
};

export default paths;