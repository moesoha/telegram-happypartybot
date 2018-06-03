# Telegram @HappyPartyBot

2016年12月因为在寝室使用手机，被老师赶回家，闲着无聊。于是接受了大家造一个开车机器人的提议，于是有了这个玩意儿。

这是[@HappyPartyBot](https://t.me/HappyPartyBot) 的生产环境代码。

### Usage

Just send messages to the bot [@HappyPartyBot](https://t.me/HappyPartyBot) .

#### /busnew [censored|uncensored]

It will return a list of bangos of jav that has new magnet links recently.

#### /busdetail \<bango\>

The cover picture, detailed information and magnet links will be sent to you.

### Update Log

#### 2018/06/03 17:34 CST

  1. *[069873c](https://github.com/moesoha/telegram-happypartybot/commit/069873ca862e1e472315caf875966a3b43509214)* 修复了在群聊中只有 `/command` 有反应，而 `/command@Bot` 没响应的bug（大概是Telegraf的锅）；
  2. *[39f6a08](https://github.com/moesoha/telegram-happypartybot/commit/39f6a088381232d46a8da06576024754752f0b50)* 针对 `/busdetail` 不带参数的情况加入了使用方式提醒。

#### 2018/05/19 23:00 CST

  1. 执行 `/busnew` 或者收到了频道推送后，无须手动输入车次，直接点击蓝色的车次，就会被链接到 bot 执行与 `/busdetail <车次>` 等价的操作，提升了用户体验；
  2. 对于 `/busdetail <车次>` 的返回结果进行了优化，现在看起来不会显乱；
  3. 将种子的哈希值以行内代码的方式展示，手机端只需要点击哈希值就可以实现快速复制；
  4. 在和别人聊天的时候在对话框中输入 `@HappyPartyBot` 并按空格可以进入 inline 模式。

顺便来个用户交流群： https://t.me/happypartygroup

有任何问题欢迎开issue甚至pr!
