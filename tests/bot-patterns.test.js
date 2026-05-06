const test = require('node:test')
const assert = require('node:assert/strict')
const { loadTsModule } = require('./helpers/loadTsModule')

const { detectBotFromUserAgent } = loadTsModule('utils/botPatterns.ts')

test('detectBotFromUserAgent identifies known AI assistant user agents as bots', async () => {
  assert.equal(detectBotFromUserAgent('claude-user/1.0').isBot, true)
  assert.equal(detectBotFromUserAgent('Mozilla/5.0 chatgpt-user/1.0').isBot, true)
  assert.equal(detectBotFromUserAgent('OpenAI-SearchBot/1.0').isBot, true)
  assert.equal(detectBotFromUserAgent('OpenAI-Codex').isBot, true)
})

test('detectBotFromUserAgent does not flag regular browser or empty user agents', async () => {
  assert.equal(
    detectBotFromUserAgent(
      'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36'
    ).isBot,
    false
  )
  assert.equal(detectBotFromUserAgent('MyCursorTool/1.0').isBot, false)
  assert.equal(detectBotFromUserAgent('CodexHelper/2.0').isBot, false)
  assert.equal(detectBotFromUserAgent('').isBot, false)
})
