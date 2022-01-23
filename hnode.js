/** @param {NS} ns **/
var nodeTarget = 1;
var offset;
var max;
var offsetamt;

async function help(ns){
	
}

export async function main(ns) {
	var running = true;
	var uArgs = ns.flags([
		['o', 1],
		['m', 30],
		['h', false]
	]);

	if(uArgs['h']){
		await help(ns);
	}

	offsetamt = uArgs['o'];
	max = uArgs['m'];

	if (max == 0) {
		max = ns.hacknet.maxNumNodes();
	}

	if (offsetamt < 0) {
		offsetamt = 0.1;
	}

	await updateOffset(ns);


	ns.disableLog("sleep");
	ns.disableLog("getServerMoneyAvailable");
	ns.clearLog();

	ns.print("Starting Script...");
	ns.print("userArg 'o' = " + uArgs['d']);
	ns.print("offsetamt = " + offsetamt);
	ns.print("Starting offset = " + offset);
	ns.print("userArg 'm' = " + uArgs['m']);
	ns.print("max = " + max);
	//nodeTarget = 1;/

	while (running) {

		await buyServers(ns);
		await upLevels(ns, 10);
		await buyServers(ns);
		await upLevels(ns, 20);
		await buyServers(ns);
		
		await upLevels(ns, 30);
		await buyServers(ns);
		await upLevels(ns, 40);
		await buyServers(ns);
		await upLevels(ns, 50);
		while (!ns.fileExists("HTTPWorm.exe")) {
			ns.print("Waiting for you to buy HTTPWorm");
			ns.toast("Waiting for you to buy HTTPWorm", "warning", 5000);
			await ns.sleep(1.8e6);
		}
		while (!ns.fileExists("SQLInject.exe")) {
			ns.print("Waiting for you to buy SQLInject");
			ns.toast("Waiting for you to buy SQLInject", "warning", 5000);
			await ns.sleep(1.8e6);
		}
		await buyServers(ns);
		await upLevels(ns, 60);
		await buyServers(ns);
		await upLevels(ns, 70);
		await buyServers(ns);
		await upLevels(ns, 75);
		await buyServers(ns);
		await upRam(ns, 2);
		await upLevels(ns, 79);
		await buyServers(ns);
		await upRam(ns, 4);
		await buyServers(ns);
		await upLevels(ns, 83);
		await buyServers(ns);
		await upRam(ns, 8);
		await upLevels(ns, 87);
		await buyServers(ns);
		await upRam(ns, 16);
		await upLevels(ns, 91);
		await buyServers(ns);
		await upRam(ns, 32);
		await upLevels(ns, 95);
		await buyServers(ns);
		await upRam(ns, 64);
		await upCores(ns, 2);
		await upLevels(ns, 105);
		await buyServers(ns);
		await upRam(ns, 64);
		await upCores(ns, 3);
		await upLevels(ns, 115);
		await buyServers(ns);
		await upRam(ns, 64);
		await upCores(ns, 4);
		await upLevels(ns, 125);
		await buyServers(ns);
		await upRam(ns, 64);
		await upCores(ns, 5);
		await upLevels(ns, 135);
		await buyServers(ns);
		await upRam(ns, 64);
		await upCores(ns, 6);
		await upLevels(ns, 145);
		await buyServers(ns);
		await upRam(ns, 64);
		await upCores(ns, 7);
		await upLevels(ns, 155);
		await buyServers(ns);
		await upRam(ns, 64);
		await upCores(ns, 8);
		await upLevels(ns, 165);
		await buyServers(ns);
		await upRam(ns, 64);
		await upCores(ns, 9);
		await upLevels(ns, 175);
		await buyServers(ns);
		await upRam(ns, 64);
		await upCores(ns, 10);
		await upLevels(ns, 185);
		await buyServers(ns);
		await upRam(ns, 64);
		await upCores(ns, 11);
		await upLevels(ns, 195);
		await buyServers(ns);
		await upRam(ns, 64);
		await upCores(ns, 12);
		await upLevels(ns, 200);
		await upCores(ns, 13);
		await upCores(ns, 14);
		await upCores(ns, 15);
		await upCores(ns, 16);

		await ns.sleep(1000);

		if (ns.hacknet.getNodeStats(0).level == 200) {

			nodeTarget = nodeTarget + 1;
			if (offsetamt != 0) {
				offsetamt = offsetamt + 0.1;
			}
		}

		if (ns.hacknet.numNodes() >= max) {
			running = false;
		}
		//ns.tprint("Add to target number here");
	}


	ns.tprint("Max nodes reached...");
	ns.tprint("Relaunch with -m argument to change the max number of nodes (0=infinite)");
	ns.tprint("Exiting Script...");
}

async function buyServers(ns) {
	ns.print("Checking if nodes need to be purchased...");
	ns.print("Nodes: " + ns.hacknet.numNodes());
	ns.print("Target: " + nodeTarget);
	while (ns.hacknet.numNodes() < nodeTarget) {
		if ((ns.hacknet.getPurchaseNodeCost() <= ns.getServerMoneyAvailable("home") - offset) && !(ns.hacknet.numNodes() > max)) {
			ns.hacknet.purchaseNode();
			ns.print("Purchased hacknet node!");
			ns.tprint("New Hacknet node Purchased! \nTotal is now: " + ns.hacknet.numNodes());
		} else {
			var cost = (ns.hacknet.getPurchaseNodeCost());
			var avail = (ns.getServerMoneyAvailable("home") - offset);
			var monNeed = cost - avail;
			monNeed = String(monNeed.toLocaleString(undefined, { style: 'currency', currency: 'USD', }));
			ns.print("Not enough money to purchase node! \nNeeds " + monNeed + " more!");
			await ns.sleep(15000);
		}
		await updateOffset(ns);
		await ns.sleep(50);
	}
}

async function upLevels(ns, lvl) {
	var nodes = ns.hacknet.numNodes();
	var i = 0;
	ns.print("Checking for level upgrades...");
	while (i < nodes) {
		while (ns.hacknet.getNodeStats(i).level < lvl) {
			if (ns.hacknet.getLevelUpgradeCost(i, 1) <= ns.getServerMoneyAvailable("home") - offset) {
				ns.hacknet.upgradeLevel(i, 1);
				ns.print("Upgraded node " + i + " level to " + ns.hacknet.getNodeStats(i).level);
			} else {
				var cost = (ns.hacknet.getLevelUpgradeCost(i));
				var avail = (ns.getServerMoneyAvailable("home") - offset);
				var monNeed = cost - avail;
				monNeed = String(monNeed.toLocaleString(undefined, { style: 'currency', currency: 'USD', }))
				ns.print("Not enough money to upgrade node " + i + " level!" + " \nNeeds " + monNeed + " more!");
				await ns.sleep(500);
			}
			await updateOffset(ns);
			await ns.sleep(50);
		}
		i++;
	}

}

async function upRam(ns, ram) {
	var nodes = ns.hacknet.numNodes();
	var i = 0;
	ns.print("Checking for ram upgrades...");
	while (i < nodes) {
		while (ns.hacknet.getNodeStats(i).ram < ram) {
			if (ns.hacknet.getRamUpgradeCost(i, 1) <= ns.getServerMoneyAvailable("home") - offset) {
				ns.hacknet.upgradeRam(i, 1);
				ns.print("Upgraded node " + i + " ram to " + ns.hacknet.getNodeStats(i).ram);
			} else {
				var cost = (ns.hacknet.getRamUpgradeCost(i));
				var avail = (ns.getServerMoneyAvailable("home") - offset);
				var monNeed = cost - avail;
				monNeed = String(monNeed.toLocaleString(undefined, { style: 'currency', currency: 'USD', }))
				ns.print("Not enough money to upgrade node " + i + " ram!" + " \nNeeds " + monNeed + " more!");
				await ns.sleep(5000);
			}
			await updateOffset(ns);
			await ns.sleep(50);
		}
		i++;
	}
}

async function upCores(ns, cores) {
	var nodes = ns.hacknet.numNodes();
	var i = 0;
	ns.print("Checking for core upgrades...");
	while (i < nodes) {
		while (ns.hacknet.getNodeStats(i).cores < cores) {
			if (ns.hacknet.getCoreUpgradeCost(i, 1) <= ns.getServerMoneyAvailable("home") - offset) {
				ns.hacknet.upgradeCore(i, 1);
				ns.print("Upgraded node " + i + " cores to " + ns.hacknet.getNodeStats(i).cores);
			} else {
				var cost = (ns.hacknet.getCoreUpgradeCost(i));
				var avail = (ns.getServerMoneyAvailable("home") - offset);
				var monNeed = cost - avail;
				monNeed = String(monNeed.toLocaleString(undefined, { style: 'currency', currency: 'USD', }))
				ns.print("Not enough money to upgrade node " + i + " cores!" + " \nNeeds " + monNeed + " more!");
				await ns.sleep(5000);
			}
			await updateOffset(ns);
			await ns.sleep(50);
		}
		i++;
	}
}

async function updateOffset(ns) {



	if (ns.hacknet.numNodes() != 0) {
		var masterNode = ns.hacknet.getNodeStats(0);
		if (ns.hacknet.getNodeStats(0).level < 200) {
			nodeTarget = Math.floor((ns.hacknet.getNodeStats(0).level) / 7);
		}

		if (ns.hacknet.getNodeStats(0).level < 95) {
			nodeTarget = Math.floor((ns.hacknet.getNodeStats(0).level) / 6);
		}

		if ((nodeTarget == 1) && (masterNode.level == 200)) {
			nodeTarget = 28;
		}


		//900000
		//85000000

		var lvlcost = ns.hacknet.getLevelUpgradeCost(0);
		var corecost = ns.hacknet.getCoreUpgradeCost(0);
		var nodeMult = (ns.hacknet.numNodes()) * 2;
		if (masterNode.level == 200) {
			lvlcost = 900000;
		}
		if (masterNode.cores == 16) {
			corecost = 85000000;
		}
		offset = ((((lvlcost * corecost) / 64) / 1000) * nodeMult) * offsetamt;
	} else {
		offset = 0;
	}

	if (offsetamt == 0) {
		//ns.tprint("hi");
		offset = 0;
	}
	//ns.tprint(nodeTarget);
	ns.print("Script is leaving " + String(offset.toLocaleString(undefined, { style: 'currency', currency: 'USD', })) + " in your account");
}