import Customer from "./Customer";

let elapsedTime = 0;
let myQueue = [];

function increaseCustomerQueueTime() {
  myQueue[0].inQueueTime = elapsedTime;
}

let increaseEveryCustomerQueueTime = () => {
  myQueue.forEach(customer => (customer.inQueueTime = elapsedTime));
};

function increaseTime() {
  if (elapsedTime === 10) {
    return;
  }
  elapsedTime++;
  increaseCustomerQueueTime();
}

function increaseTimeInInterval() {
  setInterval(increaseTime, 1000);
}

function increaseTimeForWholeQueue() {
  setInterval(increaseEveryCustomerQueueTime, 1000);
}

describe("Customer", () => {
  it("customer object is created properly", () => {
    let CustomerA = new Customer(1, 120);
    expect(CustomerA).toEqual(new Customer(1, 120));
  });

  it("can set the customer's time in queue correctly with a static value", () => {
    let CustomerB = new Customer(1, 50);
    CustomerB.inQueueTime = 30;
    expect(CustomerB.inQueueTime).toBe(30);
  });

  it("timer is run for 10 seconds and value of customer in queue is updated accordingly", () => {
    let CustomerA = new Customer(1, 120);

    myQueue.push(CustomerA);
    increaseCustomerQueueTime();
    jest.useFakeTimers();
    increaseTimeInInterval();
    jest.advanceTimersByTime(10000);
    expect(CustomerA.inQueueTime).toBe(10);
  });

  it("can check that the customer's time inside the queue can be compared with the time customer is willing to be inside the queue. ", () => {
    let CustomerB = new Customer(1, 60);

    myQueue.push(CustomerB);
    jest.useFakeTimers();
    increaseTimeInInterval();
    jest.advanceTimersByTime(10000);
    expect(CustomerB.isCanWaitTimeEqualtoInQueueTime()).toBe(false);
  });

  it("can increase the customer's time inside the queue for every customer", () => {
    let CustomerA = new Customer(1, 60);
    let CustomerB = new Customer(2, 120);
    myQueue.push(CustomerA);
    myQueue.push(CustomerB);
    jest.useFakeTimers();
    increaseEveryCustomerQueueTime();
    jest.advanceTimersByTime(10000);
    expect(CustomerA.inQueueTime).toBe(10);
    expect(CustomerA.inQueueTime).toBe(10);
  });
});
