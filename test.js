export class TelegramBot {
  constructor(token, options = {}) {
    this.token = token;
    this.options = {
      webhookReply: true,
      ...options,
    };
    this.methodMap = new Map();
    this.textListeners = new Map();
  }

  setWebHook(url, options = {}) {
    const params = {
      url,
      ...options,
    };
    return this._request('setWebhook', params);
  }

  deleteWebHook(options = {}) {
    return this._request('deleteWebhook', options);
  }

  getWebHookInfo() {
    return this._request('getWebhookInfo');
  }

  on(method, callback) {
    if (typeof callback !== 'function') {
      throw new Error('Callback must be a function');
    }
    this.methodMap.set(method, callback);
  }

  onText(regex, callback) {
    if (!(regex instanceof RegExp)) {
      throw new Error('First argument must be a RegExp');
    }
    if (typeof callback !== 'function') {
      throw new Error('Second argument must be a function');
    }
    this.textListeners.set(regex.toString(), { regex, callback });
  }

  async handleUpdate(update, response) {
    if (!update) {
      throw new Error('Update object is missing');
    }

    const { message, edited_message, channel_post, edited_channel_post, inline_query, chosen_inline_result, callback_query, shipping_query, pre_checkout_query, poll, poll_answer } = update;

    if (message) {
      const callback = this.methodMap.get('message');
      if (callback) await callback(message);
      if (message.text) {
        for (const [, listener] of this.textListeners) {
          const match = message.text.match(listener.regex);
          if (match) {
            await listener.callback(message, match);
          }
        }
      }
    }

    if (edited_message) {
      const callback = this.methodMap.get('edited_message');
      if (callback) await callback(edited_message);
    }

    if (channel_post) {
      const callback = this.methodMap.get('channel_post');
      if (callback) await callback(channel_post);
    }

    if (edited_channel_post) {
      const callback = this.methodMap.get('edited_channel_post');
      if (callback) await callback(edited_channel_post);
    }

    if (inline_query) {
      const callback = this.methodMap.get('inline_query');
      if (callback) await callback(inline_query);
    }

    if (chosen_inline_result) {
      const callback = this.methodMap.get('chosen_inline_result');
      if (callback) await callback(chosen_inline_result);
    }

    if (callback_query) {
      const callback = this.methodMap.get('callback_query');
      if (callback) await callback(callback_query);
    }

    if (shipping_query) {
      const callback = this.methodMap.get('shipping_query');
      if (callback) await callback(shipping_query);
    }

    if (pre_checkout_query) {
      const callback = this.methodMap.get('pre_checkout_query');
      if (callback) await callback(pre_checkout_query);
    }

    if (poll) {
      const callback = this.methodMap.get('poll');
      if (callback) await callback(poll);
    }

    if (poll_answer) {
      const callback = this.methodMap.get('poll_answer');
      if (callback) await callback(poll_answer);
    }

    if (this.options.webhookReply && response) {
      response.send('OK');
    }
  }

  editMessageText(text, options = {}) {
    const params = {
      text,
      ...options,
    };
    return this._request('editMessageText', params);
  }

  editMessageCaption(options = {}) {
    return this._request('editMessageCaption', options);
  }

  editMessageMedia(media, options = {}) {
    const params = {
      media: JSON.stringify(media),
      ...options,
    };
    return this._request('editMessageMedia', params);
  }

  editMessageReplyMarkup(replyMarkup, options = {}) {
    const params = {
      reply_markup: JSON.stringify(replyMarkup),
      ...options,
    };
    return this._request('editMessageReplyMarkup', params);
  }

  stopPoll(chatId, messageId, options = {}) {
    const params = {
      chat_id: chatId,
      message_id: messageId,
      ...options,
    };
    return this._request('stopPoll', params);
  }

  async sendMessage(chatId, text, options = {}) {
    const params = {
      chat_id: chatId,
      text,
      ...options,
    };
    return this._request('sendMessage', params);
  }

  async forwardMessage(chatId, fromChatId, messageId, options = {}) {
    const params = {
      chat_id: chatId,
      from_chat_id: fromChatId,
      message_id: messageId,
      ...options,
    };
    return this._request('forwardMessage', params);
  }

  async sendPhoto(chatId, photo, options = {}) {
    const params = {
      chat_id: chatId,
      photo,
      ...options,
    };
    return this._request('sendPhoto', params);
  }

  async sendAudio(chatId, audio, options = {}) {
    const params = {
      chat_id: chatId,
      audio,
      ...options,
    };
    return this._request('sendAudio', params);
  }

  async sendDocument(chatId, document, options = {}) {
    const params = {
      chat_id: chatId,
      document,
      ...options,
    };
    return this._request('sendDocument', params);
  }

  async sendSticker(chatId, sticker, options = {}) {
    const params = {
      chat_id: chatId,
      sticker,
      ...options,
    };
    return this._request('sendSticker', params);
  }

  async sendVideo(chatId, video, options = {}) {
    const params = {
      chat_id: chatId,
      video,
      ...options,
    };
    return this._request('sendVideo', params);
  }

  async sendVoice(chatId, voice, options = {}) {
    const params = {
      chat_id: chatId,
      voice,
      ...options,
    };
    return this._request('sendVoice', params);
  }

  async sendVideoNote(chatId, videoNote, options = {}) {
    const params = {
      chat_id: chatId,
      video_note: videoNote,
      ...options,
    };
    return this._request('sendVideoNote', params);
  }

  async sendMediaGroup(chatId, media, options = {}) {
    const params = {
      chat_id: chatId,
      media,
      ...options,
    };
    return this._request('sendMediaGroup', params);
  }

  async sendLocation(chatId, latitude, longitude, options = {}) {
    const params = {
      chat_id: chatId,
      latitude,
      longitude,
      ...options,
    };
    return this._request('sendLocation', params);
  }

  async sendVenue(chatId, latitude, longitude, title, address, options = {}) {
    const params = {
      chat_id: chatId,
      latitude,
      longitude,
      title,
      address,
      ...options,
    };
    return this._request('sendVenue', params);
  }

  async sendContact(chatId, phoneNumber, firstName, options = {}) {
    const params = {
      chat_id: chatId,
      phone_number: phoneNumber,
      first_name: firstName,
      ...options,
    };
    return this._request('sendContact', params);
  }

  async sendPoll(chatId, question, options, pollOptions = {}) {
    const params = {
      chat_id: chatId,
      question,
      options,
      ...pollOptions,
    };
    return this._request('sendPoll', params);
  }

  async sendDice(chatId, options = {}) {
    const params = {
      chat_id: chatId,
      ...options,
    };
    return this._request('sendDice', params);
  }

  async sendChatAction(chatId, action) {
    const params = {
      chat_id: chatId,
      action,
    };
    return this._request('sendChatAction', params);
  }

  async kickChatMember(chatId, userId, options = {}) {
    const params = {
      chat_id: chatId,
      user_id: userId,
      ...options,
    };
    return this._request('kickChatMember', params);
  }

  async unbanChatMember(chatId, userId, options = {}) {
    const params = {
      chat_id: chatId,
      user_id: userId,
      ...options,
    };
    return this._request('unbanChatMember', params);
  }

  async restrictChatMember(chatId, userId, permissions, options = {}) {
    const params = {
      chat_id: chatId,
      user_id: userId,
      permissions,
      ...options,
    };
    return this._request('restrictChatMember', params);
  }

  async promoteChatMember(chatId, userId, options = {}) {
    const params = {
      chat_id: chatId,
      user_id: userId,
      ...options,
    };
    return this._request('promoteChatMember', params);
  }

  async setChatAdministratorCustomTitle(chatId, userId, customTitle) {
    const params = {
      chat_id: chatId,
      user_id: userId,
      custom_title: customTitle,
    };
    return this._request('setChatAdministratorCustomTitle', params);
  }

  async exportChatInviteLink(chatId) {
    const params = {
      chat_id: chatId,
    };
    return this._request('exportChatInviteLink', params);
  }

  async setChatPhoto(chatId, photo) {
    const params = {
      chat_id: chatId,
      photo,
    };
    return this._request('setChatPhoto', params);
  }

  async deleteChatPhoto(chatId) {
    const params = {
      chat_id: chatId,
    };
    return this._request('deleteChatPhoto', params);
  }

  async setChatTitle(chatId, title) {
    const params = {
      chat_id: chatId,
      title,
    };
    return this._request('setChatTitle', params);
  }

  async setChatDescription(chatId, description) {
    const params = {
      chat_id: chatId,
      description,
    };
    return this._request('setChatDescription', params);
  }

  async pinChatMessage(chatId, messageId, options = {}) {
    const params = {
      chat_id: chatId,
      message_id: messageId,
      ...options,
    };
    return this._request('pinChatMessage', params);
  }

  async unpinChatMessage(chatId, messageId) {
    const params = {
      chat_id: chatId,
      message_id: messageId,
    };
    return this._request('unpinChatMessage', params);
  }

  async unpinAllChatMessages(chatId) {
    const params = {
      chat_id: chatId,
    };
    return this._request('unpinAllChatMessages', params);
  }

  async leaveChat(chatId) {
    const params = {
      chat_id: chatId,
    };
    return this._request('leaveChat', params);
  }

  async getChat(chatId) {
    const params = {
      chat_id: chatId,
    };
    return this._request('getChat', params);
  }

  async getChatAdministrators(chatId) {
    const params = {
      chat_id: chatId,
    };
    return this._request('getChatAdministrators', params);
  }

  async getChatMembersCount(chatId) {
    const params = {
      chat_id: chatId,
    };
    return this._request('getChatMembersCount', params);
  }

  async getChatMember(chatId, userId) {
    const params = {
      chat_id: chatId,
      user_id: userId,
    };
    return this._request('getChatMember', params);
  }

  async setChatStickerSet(chatId, stickerSetName) {
    const params = {
      chat_id: chatId,
      sticker_set_name: stickerSetName,
    };
    return this._request('setChatStickerSet', params);
  }

  async deleteChatStickerSet(chatId) {
    const params = {
      chat_id: chatId,
    };
    return this._request('deleteChatStickerSet', params);
  }

  async answerCallbackQuery(callbackQueryId, options = {}) {
    const params = {
      callback_query_id: callbackQueryId,
      ...options,
    };
    return this._request('answerCallbackQuery', params);
  }

  async setMyCommands(commands) {
    const params = {
      commands,
    };
    return this._request('setMyCommands', params);
  }

  async getMyCommands() {
    return this._request('getMyCommands');
  }

  async setChatPermissions(chatId, permissions) {
    const params = {
      chat_id: chatId,
      permissions,
    };
    return this._request('setChatPermissions', params);
  }

  async deleteMessage(chatId, messageId) {
    const params = {
      chat_id: chatId,
      message_id: messageId,
    };
    return this._request('deleteMessage', params);
  }

  async sendAnimation(chatId, animation, options = {}) {
    const params = {
      chat_id: chatId,
      animation,
      ...options,
    };
    return this._request('sendAnimation', params);
  }

  async answerInlineQuery(inlineQueryId, results, options = {}) {
    const params = {
      inline_query_id: inlineQueryId,
      results,
      ...options,
    };
    return this._request('answerInlineQuery', params);
  }

  async setGameScore(userId, score, options = {}) {
    const params = {
      user_id: userId,
      score,
      ...options,
    };
    return this._request('setGameScore', params);
  }

  async getGameHighScores(userId, options = {}) {
    const params = {
      user_id: userId,
      ...options,
    };
    return this._request('getGameHighScores', params);
  }

  _request(method, params = {}) {
    const url = `https://api.telegram.org/bot${this.token}/${method}`;
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    };

    return fetch(url, options).then(response => response.json());
  }
}
