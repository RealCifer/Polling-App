import { Poll } from "../models/Poll";

class PollService {
  private activePollId: string | null = null;

  async createPoll(
    question: string,
    options: string[],
    duration: number
  ) {
    if (this.activePollId) {
      throw new Error("A poll is already active");
    }

    const poll = await Poll.create({
      question,
      options: options.map((text) => ({ text, votes: 0 })),
      duration,
      startedAt: new Date(),
      isActive: true,
    });

    this.activePollId = poll._id.toString();
    return poll;
  }

  async getActivePoll() {
    if (!this.activePollId) return null;

    const poll = await Poll.findById(this.activePollId);
    if (!poll || !poll.isActive) {
      this.activePollId = null;
      return null;
    }

    return poll;
  }

  async endPoll() {
    if (!this.activePollId) return;

    await Poll.findByIdAndUpdate(this.activePollId, {
      isActive: false,
    });

    this.activePollId = null;
  }

  getRemainingTime(poll: any) {
    const elapsed =
      (Date.now() - new Date(poll.startedAt).getTime()) / 1000;

    return Math.max(0, Math.floor(poll.duration - elapsed));
  }
}

export const pollService = new PollService();
