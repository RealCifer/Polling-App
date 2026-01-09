import Poll from "../models/Poll";

class PollService {
  static async createPoll(question: string, options: string[], duration: number) {
    await Poll.updateMany({ isActive: true }, { isActive: false });

    const poll = await Poll.create({
      question,
      options: options.map((text) => ({ text, votes: 0 })),
      duration,
      startTime: new Date(),
      isActive: true,
    });

    return poll;
  }

  static async getActivePollWithRemainingTime() {
    const poll = await Poll.findOne({ isActive: true });
    if (!poll) return null;

    const now = Date.now();
    const start = new Date(poll.startTime).getTime();
    const elapsed = Math.floor((now - start) / 1000);
    const remainingTime = Math.max(poll.duration - elapsed, 0);

    return { poll, remainingTime };
  }

  static async castVote(optionIndex: number, voterId: string) {
    const poll = await Poll.findOne({ isActive: true });
    if (!poll) return { error: "NO_ACTIVE_POLL" };

    const now = Date.now();
    const elapsed = Math.floor((now - poll.startTime.getTime()) / 1000);
    if (elapsed >= poll.duration) return { error: "TIME_UP" };

    if (poll.voters.includes(voterId)) return { error: "ALREADY_VOTED" };

    if (!poll.options[optionIndex]) return { error: "INVALID_OPTION" };

    poll.options[optionIndex].votes += 1;
    poll.voters.push(voterId);
    await poll.save();

    return { poll };
  }

  static async endPoll() {
    const poll = await Poll.findOne({ isActive: true });
    if (!poll) return null;

    poll.isActive = false;
    await poll.save();
    return poll;
  }
}

export default PollService;
