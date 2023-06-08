let
  pkgs = import <nixpkgs> {};
in

with pkgs;

mkShell {
  buildInputs = [
    nodejs-16_x
    (with nodePackages; [
      typescript
      typescript-language-server
      prettier
      create-react-app
      yarn
    ])
  ];
}
