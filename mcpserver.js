export const tools = [
  {
    name: "create_booking",
    async execute(args, ctx) {
      const res = await fetch("http://localhost:3000/bookings", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${ctx.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(args)
      });
      return await res.json();
    }
  }
];
