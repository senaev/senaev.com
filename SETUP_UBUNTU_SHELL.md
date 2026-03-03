Install components

```shell
sudo apt update
sudo apt install -y zsh git curl
```

Change the default shell

```shell
chsh -s $(which zsh)
```

Then, log out and in to the shell

Install oh-my-zsh

```shell
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"
```

Install plugins for oh-my-zsh

```shell
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git \
  ${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k

git clone https://github.com/zsh-users/zsh-autosuggestions \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-autosuggestions

git clone https://github.com/zsh-users/zsh-syntax-highlighting \
  ${ZSH_CUSTOM:-~/.oh-my-zsh/custom}/plugins/zsh-syntax-highlighting
```

Edit config to customize (run `nano ~/.zshrc`):

```shell
ZSH_THEME="powerlevel10k/powerlevel10k"
```

```shell
plugins=(
  git
  docker
  kubectl
  sudo
  history
  zsh-autosuggestions
  zsh-syntax-highlighting
)
```

Install fornt on a local machine and set it in iTerm

- https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf
- https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold.ttf
- https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Italic.ttf
- https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Bold%20Italic.ttf

Restart terminal and configure Powerlevel10k

```shell
p10k configure
```
