import { createConsumer } from "@rails/actioncable";

export default createConsumer("wss://localhost:3000/cable");
