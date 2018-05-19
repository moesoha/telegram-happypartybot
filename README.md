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

#### 2018/05/19 23:00

  1. 执行 `/busnew` 或者收到了频道推送后，无须手动输入车次，直接点击蓝色的车次，就会被链接到 bot 执行与 `/busdetail <车次>` 等价的操作，提升了用户体验；
  2. 对于 `/busdetail <车次>` 的返回结果进行了优化，现在看起来不会显乱；
  3. 将种子的哈希值以行内代码的方式展示，手机端只需要点击哈希值就可以实现快速复制；
  4. 在和别人聊天的时候在对话框中输入 `@HappyPartyBot` 并按空格可以进入 inline 模式。

顺便来个用户交流群： https://t.me/happypartygroup

有任何问题欢迎开issue甚至pr!
